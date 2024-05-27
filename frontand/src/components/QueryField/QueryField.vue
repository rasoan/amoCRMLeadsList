<template>
  <Space direction="vertical">
    <InputSearch
      v-model:value="store.query"
      :placeholder="placeholder"
      style="width: 200px"
      :status="status"
      @input="onChangeInputQuery"
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

   const statusField_ok = {
     status: "",
     placeholder: "Введите query запрос",
   };
   const statusField_error = {
     status: "error",
     placeholder: "Не менее 3 символов должно быть",
   };

   let status = statusField_error.status as "" | "error";
   let placeholder = statusField_error.placeholder;

   const onChangeInputQuery = (event: ChangeEvent) => {
     if (event.target.value && event.target.value.length > 3) {
       status = statusField_ok.status as "" | "error";
       placeholder = statusField_ok.placeholder;

       store.onChangeInputQuery(event);

       return;
     }
     else {
       status = statusField_error.status as "" | "error";
       placeholder = statusField_error.placeholder;
     }
   };
</script>
