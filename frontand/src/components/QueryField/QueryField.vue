<template>
  <Space direction="vertical">
    <InputSearch
      v-model:value="store.query"
      placeholder="input search text"
      style="width: 200px"
      @input="(event: ChangeEvent) => store.onChangeInputQuery(event)"
    />
  </Space>
</template>

<script setup lang="ts">
   import {
     InputSearch,
     Space,
   } from 'ant-design-vue';
   import {ChangeEvent} from "ant-design-vue/es/_util/EventInterface";
   import { store } from "@/store/store";
</script>
