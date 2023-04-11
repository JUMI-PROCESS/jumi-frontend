import ElementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import '@bpmn-io/element-template-chooser/dist/element-template-chooser.css';
import axios from 'axios';
import 'bpmn-js-properties-panel/dist/assets/element-templates.css';
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import CamundaCustomModdle from 'camunda-bpmn-moddle/resources/camunda.json';
import minimapModule from 'diagram-js-minimap';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
    ElementTemplatesPropertiesProviderModule,
} from '../../../lib/bpmn-panel/dist/index.esm';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { UserContext } from '../../contexts/UserContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IProcess, Process } from '../domain/Process';
import { MODELER, PANEL_MENU, SAVE, UPDATE, VIEWVER } from '../utilities/TypeProcess';
import './Modeler.css';
import templates from '/public/template.json';

type Props = {
    process: Process | null;
};

export default function Modeler({ process }: Props) {
    const userContext: Record<string, any> = useContext(UserContext);
    const processRepository: EntityRepository<IProcess> = useContext(RepositoryContext)['process'];
    const deploymentRepository: EntityRepository<IProcess> = useContext(RepositoryContext)['deployment'];

    const _id = useParams()['_id'] || '';

    const [container, setContainer] = useState(null);
    const [modeler, setModeler] = useState(null);

    const [data, setData] = useState<object | null>(null);
    const [mode, setMode] = useState(SAVE);

    useEffect(() => {
        processRepository.setConfig({ token: `${userContext['token']}` });
        deploymentRepository.setConfig({ token: `${userContext['token']}` });
    }, []);

    useEffect(() => {
        if (modeler) {
            if (_id) {
                setMode(UPDATE);
                const fetchData = async () => {
                    const res = await processRepository.getById(_id);
                    setData(res.data);
                    modeler.importXML(atob(res.data.source));
                    setModeler(modeler);
                };
                fetchData();
            } else {
                setMode(SAVE);
                const fetchData = async () => {
                    const res = await axios.get('/public/diagram.bpmn', {
                        'Content-Type': 'text; charset=utf-8',
                    } as any);
                    setData(new Process({ source: res.data }));
                    modeler.importXML(res.data);
                    setModeler(modeler);
                };
                fetchData();
            }
        }
    }, [_id, modeler]);

    useEffect(() => {
        const fetchData = async () => {
            setContainer(document.getElementById('canvas'));
            if (container && !modeler) {
                console.log('PASO');
                let modeler = new BpmnModeler({
                    container,
                    additionalModules: [
                        BpmnPropertiesPanelModule,
                        BpmnPropertiesProviderModule,
                        ElementTemplatesPropertiesProviderModule,
                        CamundaPlatformPropertiesProviderModule,
                        minimapModule,
                        TokenSimulationModule,
                        ElementTemplateChooserModule,
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
                const data_ = await axios.get('/public/diagram.bpmn', { 'Content-Type': 'text; charset=utf-8' } as any);
                setData(new Process({ source: data_.data }));
                modeler.importXML(data_.data);
                setModeler(modeler);
            }
        };
        fetchData();
    });

    const onSave = () => {
        if (modeler) {
            const rootElement = modeler.get('canvas').getRootElement();
            const { name } = rootElement['businessObject'];
            if (mode == SAVE) {
                modeler.saveXML().then((xml: any) => processRepository.save(new Process({ name, source: xml.xml })));
            } else {
                modeler
                    .saveXML()
                    .then((xml: any) => processRepository.update(_id, new Process({ ...data, name, source: xml.xml })));
            }
        }
    };

    const onCreate = () => {
        if (modeler) {
            axios.get('/diagram.bpmn', { 'Content-Type': 'text; charset=utf-8' } as any).then((data) => {
                setData(new Process({ source: data }));
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
                modeler.saveXML().then((xml: any) => deploymentRepository.save(new Process({ name, source: xml.xml })));
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
            <div id="modeler">
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
