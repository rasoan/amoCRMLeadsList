'use strict';

import {Api} from "../../src/Api/Api";
import {AxiosStatic} from "axios/index";
import {fakeAxios} from "../fakeAxios/fakeAxios";

export class FakeApi extends Api {
    protected static _getAxios(): AxiosStatic {
        return fakeAxios as unknown as AxiosStatic;
    }
}
