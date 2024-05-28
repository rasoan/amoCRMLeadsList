'use strict';

import { reactive } from 'vue'
import axios from "axios";

import {ChangeEvent} from "ant-design-vue/es/_util/EventInterface";

export const store = reactive({
  leads: {},
  isLoadLeads: false,
  async getLeads(queryString: string) {
    this.isLoadLeads = true;

    const debounceGetLeads = debounce(500, async () => {
      this.leads = await axios.get(`http://localhost:3000/leads/list?query=${queryString}`);
    });

    void debounceGetLeads();

    this.isLoadLeads = false;
  }
});

const debounce = (timeout: number, callback: (...params: any[]) => any, immed: boolean = false) => {
  let timer: number | undefined = undefined;

  return function (this: any, ...args: any[]) {
    if (timer === undefined && immed) {
      callback.apply(this, args);
    }

    clearTimeout(timer);

    timer = setTimeout(() => callback.apply(this, args), timeout);

    return timer;
  }
};
