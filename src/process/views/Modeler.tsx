// @ts-ignore
import ElementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import '@bpmn-io/element-template-chooser/dist/element-template-chooser.css';
import axios from 'axios';
import 'bpmn-js-properties-panel/dist/assets/element-templates.css';
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
// @ts-ignore
import TokenSimulationModule from 'bpmn-js-token-simulation';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
// @ts-ignore
import BpmnModeler from 'bpmn-js/lib/Modeler';
import CamundaCustomModdle from 'camunda-bpmn-moddle/resources/camunda.json';
// @ts-ignore
import minimapModule from 'diagram-js-minimap';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// @ts-ignore
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
    ElementTemplatesPropertiesProviderModule,
} from '../../../lib/bpmn-panel/dist/index.esm';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IDefinition, IDeployment, IProcess, Process } from '../domain/Process';
import { SAVE, UPDATE } from '../utilities/TypeProcess';
import './Modeler.css';
// @ts-ignore
import templates from '/public/template.json';

type Props = {
    process: Process | null;
};

export default function Modeler({ process }: Props) {
    const processRepository: EntityRepository<IProcess> = useContext(RepositoryContext)['process'];
    const deploymentRepository: EntityRepository<IDeployment> = useContext(RepositoryContext)['deployment'];
    const definitionRepository: EntityRepository<IDefinition> = useContext(RepositoryContext)['definition'];

    const _id = useParams()['_id'] || '';
    const [searchParams, setSearchParams] = useSearchParams();
    const queryPath = searchParams.get('type') || 'procesos';

    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [modeler, setModeler] = useState<any>(null);

    const [data, setData] = useState<object | null>(null);
    const [mode, setMode] = useState(SAVE);

    useEffect(() => {
        if (modeler) {
            if (_id) {
                setMode(UPDATE);
                const fetchData = async () => {
                    let res: any;
                    if (queryPath.includes('procesos')) res = await processRepository.getById(_id);
                    else if (queryPath.includes('desplegados')) res = await deploymentRepository.getById(_id);
                    else res = await definitionRepository.getById(_id);
                    setData(res.data);
                    await modeler.importXML(res.data.binary ? atob(res.data.binary) : res.data.xml);
                    setModeler(modeler);
                };
                fetchData();
            } else {
                setMode(SAVE);
                const fetchData = async () => {
                    const res = await axios.get('/diagram.bpmn', {
                        'Content-Type': 'text; charset=utf-8',
                    } as any);
                    setData(new Process({ source: res.data }));
                    await modeler.importXML(res.data);
                };

                fetchData();

                // setModeler(modeler);
            }
        }
    }, [_id, modeler]);

    useEffect(() => {
        const fetchData = async () => {
            setContainer(document.getElementById('canvas'));
            if (container && !modeler) {
                var customPropertiesProvider = {
                    getTabs: function (element) {
                        // Verificar si el elemento es un evento de error
                        if (element && element.businessObject.$instanceOf('bpmn:ErrorEventDefinition')) {
                            // Devolver la pestaña "Input/Output" personalizada
                            return [
                                {
                                    id: 'custom-input-output',
                                    label: 'Input/Output',
                                    groups: [
                                        {
                                            id: 'input-output-group',
                                            label: '',
                                            entries: [
                                                {
                                                    id: 'retry-time-cycle',
                                                    html:
                                                        '<div class="pp-row pp-spacing label"><label for="camunda-retry-time-cycle">Retry Time Cycle</label></div>' +
                                                        '<div class="pp-row pp-spacing">' +
                                                        '<input id="camunda-retry-time-cycle" type="text" name="retryTimeCycle" />' +
                                                        '</div>',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ];
                        }
                        // Devolver la vista de propiedades predeterminada para todos los demás elementos
                        return customPropertiesProvider.getTabs(element);
                    },
                };
                var customModules = {
                    propertiesProvider: [ 'type', customPropertiesProvider ]
                  };
                const modeler_ = new BpmnModeler({
                    container,
                    additionalModules: [
                        BpmnPropertiesPanelModule,
                        BpmnPropertiesProviderModule,
                        ElementTemplatesPropertiesProviderModule,
                        CamundaPlatformPropertiesProviderModule,
                        minimapModule,
                        TokenSimulationModule,
                        ElementTemplateChooserModule,
                        customModules
                    ],
                    propertiesPanel: {
                        parent: document.getElementById('properties-panel'),
                    },
                    keyboard: {
                        bindTo: document,
                    },
                    moddleExtensions: {
                        camunda: CamundaCustomModdle,
                    },
                    elementTemplates: templates,
                });
                setModeler(modeler_);
            }
        };
        fetchData();
    });

    const onSave = () => {
        if (modeler) {
            const rootElement = modeler.get('canvas').getRootElement();
            const { name } = rootElement['businessObject'];
            if (mode == SAVE || queryPath == 'desplegados' || queryPath == 'definiciones') {
                modeler.saveXML().then((xml: any) =>
                    processRepository
                        .save(new Process({ name, binary: xml.xml }))
                        .then((data) => toast.success('Proceso guardado'))
                        .catch((error) => toast.error(error)),
                );
            } else {
                modeler.saveXML().then((xml: any) =>
                    processRepository
                        .update(_id, new Process({ ...data, name, binary: xml.xml }))
                        .then((data) => toast.success('Proceso actualizado'))
                        .catch((error) => toast.error(error)),
                );
            }
        }
    };

    const onCreate = () => {
        if (modeler) {
            axios.get('/diagram.bpmn', { 'Content-Type': 'text; charset=utf-8' } as any).then((data) => {
                setData(new Process({ binary: data }));
                modeler.importXML(data.data);
                setModeler(modeler);
            });
        }
    };

    const onDeployment = () => {
        if (modeler) {
            const rootElement = modeler.get('canvas').getRootElement();
            const { name } = rootElement['businessObject'];
            if (mode == SAVE || mode == UPDATE) {
                modeler.saveXML().then((xml: any) =>
                    deploymentRepository
                        .save(new Process({ name, binary: xml.xml }))
                        .then(() => toast.success('Proceso desplegado'))
                        .catch((err) => toast.error(err)),
                );
            }
        }
    };

    const onSwap = () => {
        document.getElementById('properties-panel')?.classList.toggle('hidden-properties-panel');
        document.getElementById('properties-swap')?.classList.toggle('hidden-swap');
        document.getElementsByClassName('djs-minimap')[0]?.classList.toggle('hidden-swap');
    };

    return (
        <div id="modeler">
            <div className="process-options">
                <button className="btn-over" onClick={onCreate}>
                    {mode == UPDATE ? 'BORRAR' : 'NUEVO'}
                </button>
                <button className="btn-over" onClick={onSave}>
                    GUARDAR
                </button>
                <button className="btn-over" onClick={onDeployment}>
                    DESPLEGAR
                </button>
                <button className="btn-over" onClick={onCreate}>
                    IMPORTAR
                </button>
                <button className="btn-over" onClick={onCreate}>
                    DESCARGAR
                </button>
            </div>
            <div className="modeler-bpmn">
                <div id="canvas"></div>
                <div>
                    <div id="properties-swap">
                        <span className="swap" onClick={onSwap}>
                            &#8250;
                        </span>
                    </div>
                    <div id="properties-panel"></div>
                </div>
            </div>
        </div>
    );
}
