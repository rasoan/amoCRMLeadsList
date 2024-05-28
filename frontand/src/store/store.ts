'use strict';

import { reactive } from 'vue'
import axios from "axios";

import {ApiResponses} from "@/api/api";

export const store = reactive({
  leads: [] as ApiResponses.GetLeadsDataReturn,
  isLoadingLeads: false,
  async getLeads(queryString?: string) {
    const queryPath = queryString ? `?query=${queryString}` : "";
    const pathGet = `http://localhost:3000/leads/list${queryPath}`;

    this.isLoadingLeads = true;

    const leads = await axios.get(pathGet)

    this.leads = leads.data as ApiResponses.GetLeadsDataReturn;

    this.isLoadingLeads = false;
  }
});

