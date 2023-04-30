import React from 'react';

import { VIEWVER } from '../utilities/TypeForm';

type Props = {
    type: string;
    value: any;
    isRequired: boolean,
    show: boolean
};

export default function Validated({ type, value, isRequired, show }: Props) {
    return type == VIEWVER && (!Boolean(value) && isRequired) && show ? <small className="required validated">Requerido</small> : <></>;
}
