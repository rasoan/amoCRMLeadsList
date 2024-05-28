<template>
  <Space direction="horizontal">
    <div v-if='status === "error"'>
      <Popover :title="statusField_error.placeholder">
        <InfoCircleOutlined style="color: red"/>
      </Popover>
    </div>
      <InputSearch
        v-model:value="fieldValue"
        placeholder="Введите query запрос"
        style="width: 200px"
        :status="status"
        @input="onChangeInputQuery"
        @search="onClickSearchInput"
      />
  </Space>

</template>

<script setup lang="ts">
   import { ChangeEvent } from "ant-design-vue/es/_util/EventInterface";
   import {
     InputSearch,
     Space,
     Popover,
   } from 'ant-design-vue';
   import { InfoCircleOutlined } from "@ant-design/icons-vue";
   //
   import { store } from "@/store/store";
   import { ref } from 'vue'

   let fieldValue = ref("");

   const statusField_ok = {
     status: "",
     placeholder: "Введите query запрос",
   };
   const statusField_error = {
     status: "error",
     placeholder: "Запросы с кол-вом символов от 1 до 3 не выполняются!",
   };

   let status = statusField_ok.status as "" | "error";
   let placeholder = statusField_ok.placeholder;

   const validateLengthFieldAndGetLeads = () => {
     if (fieldValue.value.length > 0
       && fieldValue.value.length <= 3
     ) {
       status = statusField_error.status as "" | "error";
       placeholder = statusField_error.placeholder;
     }
     else {
       status = statusField_ok.status as "" | "error";
       placeholder = statusField_ok.placeholder;

       void store.getLeads(fieldValue.value);

       return;
     }
   }
   const onClickSearchInput = () => {
     validateLengthFieldAndGetLeads();
   }
   const onChangeInputQuery = (event: ChangeEvent) => {
     fieldValue.value = event.target.value || "";

     validateLengthFieldAndGetLeads();
   };
</script>
