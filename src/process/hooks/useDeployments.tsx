import { useContext, useEffect, useState } from 'react';

// import { RepositoryContext } from '../../contexts/RepositoryContext';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IProcess as IDeployment } from '../domain/Process';
import { DeploymentRepositoryApi } from '../output.adapters/DeploymentRepositoryApi';

// import { SocketContext } from '../../contexts/FormSocketContext';
// import { FormSocket } from '../ports/FormSocket';

type Props = {
    query: string;
    page: number;
    paramsExtra: string[];
    type: string;
};

export default function UseDeployments({ query, page, paramsExtra, type }: Props) {
    const instanceRepository: EntityRepository<IDeployment> = new DeploymentRepositoryApi();
    // const formSocket: FormSocket = useContext(SocketContext)['form'];

    const [data, setData] = useState<Array<IDeployment>>([]);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await instanceRepository.getCounter(query, 'name', paramsExtra, type);
            setSize(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await instanceRepository.getBy(query, page, 'name', paramsExtra, type);
            setData(res.data);
        };

        fetchData();
    }, [query, page, JSON.stringify(paramsExtra)]);

    // useEffect(() => {
    //     const fetchData = async (data_: Process) => {
    //         const res = await processRepository.getFormsBy(query, page, 'name', paramsExtra, type);
    //         setData(res.data);
    //         setSize((size) => size + 1);

    //         new Notification('JUMI', { body: 'Se agrego un nuevo formulario' });
    //     };
    //     formSocket.onForm(fetchData);

    //     return () => {
    //         formSocket.URL.off('signal', fetchData);
    //     };
    // }, [query, page, JSON.stringify(paramsExtra), type]);

    return { data, size };
}
