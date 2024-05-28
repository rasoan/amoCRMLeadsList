<template>
  <Card style="min-height: 600px;">
    <div style="margin-bottom: 20px">
      <QueryField style="margin: 25px; display: flex; justify-content: right;"/>
    </div>
    <template v-if="store.isLoadingLeads">
      <Spin tip="Загрузка..."/>
    </template>
    <template v-else>
      <Table
        :columns="columns"
        :data-source="dataLeads"
        :pagination="false"
      >
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'status'">
            <Tag :style="{
              display: 'flex',
              backgroundColor: record.status.backgroundColor,
              minHeight: '30px',
              justifyContent: 'center',
              alignItems: 'center',
            }">
              <TypographyText>{{ record.status.name }}</TypographyText>
            </Tag>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <div style="margin: 20px" v-for="contact in record.contacts">
            <div>
              <UserOutlined style="font-size: 18px; margin-right: 10px;"/>
              <TypographyText type="secondary">{{ contact.name }}</TypographyText>
              <div style="margin: 20px" v-for="email in contact.emails">
                <MessageOutlined style="font-size: 18px; margin-right: 10px;"/>
                <TypographyLink v-bind:href="'mailto:' + email.value" type="secondary">{{
                    email.value
                  }}
                </TypographyLink>
              </div>
              <div style="margin: 20px" v-for="phoneNumber in contact.phoneNumbers">
                <PhoneOutlined style="font-size: 18px; margin-right: 10px;"/>
                <TypographyLink v-bind:href="'tel:' + phoneNumber.value" type="secondary">{{
                    phoneNumber.value
                  }}
                </TypographyLink>
              </div>
            </div>
          </div>
        </template>
      </Table>
    </template>
  </Card>
</template>

<script setup lang="ts">
  'use strict';

  import QueryField from "../src/components/QueryField/QueryField.vue";
  import {
    TypographyLink,
    TypographyText,
    Spin,
  } from 'ant-design-vue';
  import {
    UserOutlined,
    MessageOutlined,
    PhoneOutlined,
  } from "@ant-design/icons-vue";
  import {store} from "./store/store";
  import {
    Table,
    Card,
    Tag,
  } from 'ant-design-vue';
  import {onMounted} from "@vue/runtime-core";
  import { ref } from 'vue'

  const columns = [
    {
      title: "Название",
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Бюджет",
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: "Статус",
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: "Ответственный",
      dataIndex: 'responsible',
      key: 'responsible',
    },
    {
      title: "Дата создания",
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const dataLeads = ref([] as object[]);

  onMounted(async () => {
    await store.getLeads();

    dataLeads.value = store.leads.map((lead, index) => ({
      key: index,
      name: lead.name,
      price: lead.price,
      responsible: lead.responsible_user.name,
      status: lead.status,
      createdAt: new Date(lead.created_at * 1000).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      contacts: lead.contacts,
    })) as object[];
  });
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
