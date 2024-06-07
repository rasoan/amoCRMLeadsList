'use strict';

import {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {assertIsDefined} from "../../src/typeguards/typeguards";

export const fakeAxios = <T>(config: InternalAxiosRequestConfig<T>) => {
    const { url } = config;
    const urlSplitted = url.split('/');
    let data: T;

    if (url.includes('leads')) {
        if (url.includes('statuses')) {
            data = statusesListJSON as T;
        }
        else {
            data = leadsJSON as T;
        }
    }
    else if (url.includes('access_token')) {
        data = tokensJSON as T;
    }
    else if (url.includes('users')) {
        const userId = urlSplitted[urlSplitted.length - 1];

        const user = usersJSONList.find(userJSON => String(userJSON.id) === userId);

        assertIsDefined(user);

        data = user as T;
    }
    else if (url.includes('contacts')) {
        data = contactJSON as T;
    }

    const response: AxiosResponse<T> = {
        config,
        data,
        headers: {},
        request: "",
        status: 1,
        statusText: "",
    };

    return response;
};

const tokensJSON = {
    "token_type": "Bearer",
    "expires_in": 86400,
    "access_token": "xxxxxx",
    "refresh_token": "xxxxx"
};

const usersJSONList = [
    {
        "id": 123123,
        "name": "Вася Пупкин",
        "email": "example2@mail.com",
        "lang": "en",
        "rights": {
            "leads": {
                "view": "A",
                "edit": "A",
                "add": "A",
                "delete": "A",
                "export": "A"
            },
            "contacts": {
                "view": "A",
                "edit": "A",
                "add": "A",
                "delete": "A",
                "export": "A"
            },
            "companies": {
                "view": "A",
                "edit": "A",
                "add": "A",
                "delete": "A",
                "export": "A"
            },
            "tasks": {
                "edit": "A",
                "delete": "A"
            },
            "mail_access": false,
            "catalog_access": false,
            "status_rights": [
                {
                    "entity_type": "leads",
                    "pipeline_id": 2194576,
                    "status_id": 30846277,
                    "rights": {
                        "view": "A",
                        "edit": "A",
                        "delete": "A"
                    }
                },
                {
                    "entity_type": "leads",
                    "pipeline_id": 2212201,
                    "status_id": 30965377,
                    "rights": {
                        "view": "A",
                        "edit": "A",
                        "delete": "A"
                    }
                }
            ],
            "is_admin": false,
            "is_free": false,
            "is_active": true,
            "group_id": null,
            "role_id": null
        },
        "_links": {
            "self": {
                "href": "https://example.amocrm.ru/api/v4/users/123123/"
            }
        },
        "_embedded": {
            "roles": [
                {
                    "id": 3141,
                    "name": "Менеджер",
                    "_links": {
                        "self": {
                            "href": "https://example.amocrm.ru/api/v4/roles/3141"
                        }
                    }
                }
            ],
            "groups": [
                {
                    "id": 267688,
                    "name": "Менеджеры"
                }
            ]
        }
    },
    {
        "id": 321321,
        "name": "Виктор Крам",
        "email": "example2@mail.com",
        "lang": "ru",
        "rights": {
            "leads": {
                "view": "A",
                "edit": "A",
                "add": "G",
                "delete": "D",
                "export": "M"
            },
            "contacts": {
                "view": "A",
                "edit": "A",
                "add": "G",
                "delete": "M",
                "export": "D"
            },
            "companies": {
                "view": "A",
                "edit": "G",
                "add": "G",
                "delete": "D",
                "export": "D"
            },
            "tasks": {
                "edit": "A",
                "delete": "A"
            },
            "mail_access": true,
            "catalog_access": true,
            "status_rights": null,
            "is_admin": true,
            "is_free": false,
            "is_active": true,
            "group_id": null,
            "role_id": null
        },
        "_links": {
            "self": {
                "href": "https://example.amocrm.ru/api/v4/users/321321"
            }
        },
        "_embedded": {
            "roles": [],
            "groups": []
        }
    }
];

const statusesListJSON = {
    "_total_items": 10,
    "_embedded": {
        "statuses": [
            {
                "id": 142,
                "name": "Неразобранное",
                "sort": 10,
                "is_editable": false,
                "pipeline_id": 8205830,
                "color": "#b4f3a9",
                "type": 1,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035546"}}
            },
            {
                "id": 67035606,
                "name": "Неразобранное",
                "sort": 10,
                "is_editable": false,
                "pipeline_id": 8205830,
                "color": "#b4f3a9",
                "type": 1,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035546"}}
            },
            {
                "id": 67035574,
                "name": "Новая заявка",
                "sort": 20,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#deff81",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035550"}}
            },//
            {
                "id": 67035558,
                "name": "Принято в работу",
                "sort": 30,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#ffeab2",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035554"}}
            },
            {
                "id": 67035582,
                "name": "Прайс отправлен",
                "sort": 40,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#ffdc7f",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035558"}}
            },
            {
                "id": 67035582,
                "name": "Заказ оформлен",
                "sort": 50,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#deff81",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035562"}}
            },
            {
                "id": 67035582,
                "name": "Договор и счет отправлены",
                "sort": 60,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#ebffb1",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035566"}}
            },
            {
                "id": 67035582,
                "name": "Получен аванс/оплата (безнал)",
                "sort": 70,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#fffeb2",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035570"}}
            },
            {
                "id": 67035582,
                "name": "Заказ отправлен",
                "sort": 80,
                "is_editable": true,
                "pipeline_id": 8205830,
                "color": "#ffc8c8",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/67035574"}}
            },
            {
                "id": 67035582,
                "name": "Успешно реализовано",
                "sort": 10000,
                "is_editable": false,
                "pipeline_id": 8205830,
                "color": "#CCFF66",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/142"}}
            },
            {
                "id": 67035582,
                "name": "Не реализовано",
                "sort": 11000,
                "is_editable": false,
                "pipeline_id": 8205830,
                "color": "#D5D8DB",
                "type": 0,
                "account_id": 31767314,
                "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/pipelines/8205830/statuses/143"}}
            }
        ]
    }
};

const leadsJSON = {
    "_page": 1,
    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads?with=contacts&page=1&limit=250"}},
    "_embedded": {
        "leads": [{
            "id": 106649,
            "name": "Звонок - Переплетный картон",
            "price": 10000,
            "responsible_user_id": 123123,
            "group_id": 0,
            "status_id": 67035582,
            "pipeline_id": 8205834,
            "loss_reason_id": null,
            "created_by": 0,
            "updated_by": 0,
            "created_at": 1716617003,
            "updated_at": 1716617006,
            "closed_at": null,
            "closest_task_at": null,
            "is_deleted": false,
            "custom_fields_values": [{
                "field_id": 93709,
                "field_name": "Сумма предоплаты",
                "field_code": null,
                "field_type": "numeric",
                "values": [{"value": "10000"}]
            }, {
                "field_id": 93711,
                "field_name": "Остаток по оплате",
                "field_code": null,
                "field_type": "numeric",
                "values": [{"value": "0"}]
            }, {
                "field_id": 93713,
                "field_name": "Источник",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "АТС", "enum_id": 45997, "enum_code": null}]
            }, {
                "field_id": 93715,
                "field_name": "Детальный источник",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Звонок", "enum_id": 46007, "enum_code": null}]
            }, {
                "field_id": 93717,
                "field_name": "Склад",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Магазин", "enum_id": 46027, "enum_code": null}]
            }, {
                "field_id": 93719,
                "field_name": "План. дата отгрузки",
                "field_code": null,
                "field_type": "date",
                "values": [{"value": 1711918800}]
            }, {
                "field_id": 93721,
                "field_name": "Тип заказа",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Опт3", "enum_id": 46037, "enum_code": null}]
            }, {
                "field_id": 93753,
                "field_name": "UTM_SOURCE",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "vk"}]
            }, {
                "field_id": 93755,
                "field_name": "UTM_MEDIUM",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "CPC"}]
            }, {
                "field_id": 93757,
                "field_name": "UTM_CAMPAIGN",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "YaMarket_Dvigateli"}]
            }, {
                "field_id": 93759,
                "field_name": "UTM_CONTENT",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "post_utm"}]
            }, {
                "field_id": 93761,
                "field_name": "UTM_TERM",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "tovary_nedorogo"}]
            }, {
                "field_id": 93763,
                "field_name": "FORM ID",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "2132343"}]
            }, {
                "field_id": 93765,
                "field_name": "YA CID",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "4374374373323.23322321"}]
            }, {
                "field_id": 93767,
                "field_name": "GA CID",
                "field_code": null,
                "field_type": "text",
                "values": [{"value": "6346346341232.123213322"}]
            }],
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/106649?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [],
                "contacts": [{
                    "id": 148775,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/148775?with=contacts&page=1&limit=250"}}
                }]
            }
        }, {
            "id": 106651,
            "name": "Заказ ООО Фиалка - 40 коробок малого размера",
            "price": 10000,
            "responsible_user_id": 123123,
            "group_id": 0,
            "status_id": 67035606,
            "pipeline_id": 8205838,
            "loss_reason_id": null,
            "created_by": 0,
            "updated_by": 0,
            "created_at": 1716617005,
            "updated_at": 1716617006,
            "closed_at": null,
            "closest_task_at": null,
            "is_deleted": false,
            "custom_fields_values": [{
                "field_id": 93709,
                "field_name": "Сумма предоплаты",
                "field_code": null,
                "field_type": "numeric",
                "values": [{"value": "10000"}]
            }, {
                "field_id": 93711,
                "field_name": "Остаток по оплате",
                "field_code": null,
                "field_type": "numeric",
                "values": [{"value": "20000"}]
            }, {
                "field_id": 93713,
                "field_name": "Источник",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Почта", "enum_id": 46001, "enum_code": null}]
            }, {
                "field_id": 93715,
                "field_name": "Детальный источник",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Почта менеджера", "enum_id": 46011, "enum_code": null}]
            }, {
                "field_id": 93717,
                "field_name": "Склад",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Магазин", "enum_id": 46027, "enum_code": null}]
            }, {
                "field_id": 93719,
                "field_name": "План. дата отгрузки",
                "field_code": null,
                "field_type": "date",
                "values": [{"value": 1744750800}]
            }, {
                "field_id": 93721,
                "field_name": "Тип заказа",
                "field_code": null,
                "field_type": "select",
                "values": [{"value": "Опт2", "enum_id": 46035, "enum_code": null}]
            }],
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/106651?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [],
                "contacts": [{
                    "id": 148777,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/148777?with=contacts&page=1&limit=250"}}
                }]
            }
        }, {
            "id": 109149,
            "name": "Сделка #109149",
            "price": 0,
            "responsible_user_id": 123123,
            "group_id": 0,
            "status_id": 142,
            "pipeline_id": 8205830,
            "loss_reason_id": null,
            "created_by": 11085462,
            "updated_by": 11085462,
            "created_at": 1716631328,
            "updated_at": 1716631330,
            "closed_at": 1716631328,
            "closest_task_at": 1716757140,
            "is_deleted": false,
            "custom_fields_values": null,
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/109149?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [{
                    "id": 151913,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/companies/151913?with=contacts&page=1&limit=250"}}
                }],
                "contacts": [{
                    "id": 151915,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/151915?with=contacts&page=1&limit=250"}}
                }]
            }
        }, {
            "id": 109151,
            "name": "Сделка #109151",
            "price": 0,
            "responsible_user_id": 321321,
            "group_id": 0,
            "status_id": 142,
            "pipeline_id": 8205830,
            "loss_reason_id": null,
            "created_by": 11085462,
            "updated_by": 11085462,
            "created_at": 1716631371,
            "updated_at": 1716631371,
            "closed_at": 1716631371,
            "closest_task_at": null,
            "is_deleted": false,
            "custom_fields_values": null,
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/109151?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [{
                    "id": 151917,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/companies/151917?with=contacts&page=1&limit=250"}}
                }],
                "contacts": [{
                    "id": 151919,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/151919?with=contacts&page=1&limit=250"}}
                }]
            }
        }, {
            "id": 109139,
            "name": "А это вторая сделка моя кстати",
            "price": 44444,
            "responsible_user_id": 321321,
            "group_id": 0,
            "status_id": 67035574,
            "pipeline_id": 8205830,
            "loss_reason_id": null,
            "created_by": 11085462,
            "updated_by": 11085462,
            "created_at": 1716631252,
            "updated_at": 1716929356,
            "closed_at": null,
            "closest_task_at": null,
            "is_deleted": false,
            "custom_fields_values": null,
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/109139?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [{
                    "id": 151901,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/companies/151901?with=contacts&page=1&limit=250"}}
                }],
                "contacts": [{
                    "id": 151903,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/151903?with=contacts&page=1&limit=250"}}
                }]
            }
        }, {
            "id": 109163,
            "name": "Test lead!",
            "price": 123456,
            "responsible_user_id": 321321,
            "group_id": 0,
            "status_id": 67035558,
            "pipeline_id": 8205830,
            "loss_reason_id": null,
            "created_by": 11085462,
            "updated_by": 11085462,
            "created_at": 1716631433,
            "updated_at": 1716929362,
            "closed_at": null,
            "closest_task_at": null,
            "is_deleted": false,
            "custom_fields_values": null,
            "score": null,
            "account_id": 31767314,
            "labor_cost": null,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/leads/109163?with=contacts&page=1&limit=250"}},
            "_embedded": {
                "tags": [],
                "companies": [{
                    "id": 151931,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/companies/151931?with=contacts&page=1&limit=250"}}
                }],
                "contacts": [{
                    "id": 151933,
                    "is_main": true,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/151933?with=contacts&page=1&limit=250"}}
                }, {
                    "id": 153333,
                    "is_main": false,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/153333?with=contacts&page=1&limit=250"}}
                }, {
                    "id": 384882,
                    "is_main": false,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/384882?with=contacts&page=1&limit=250"}}
                }, {
                    "id": 384936,
                    "is_main": false,
                    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/384936?with=contacts&page=1&limit=250"}}
                }]
            }
        }]
    }
}

const contactJSON = {
    "id": 148775,
    "name": "КОнтакт контакт контакт!!!",
    "first_name": "",
    "last_name": "",
    "responsible_user_id": 11085462,
    "group_id": 0,
    "created_by": 11085462,
    "updated_by": 11085462,
    "created_at": 1716901534,
    "updated_at": 1716901534,
    "closest_task_at": null,
    "is_deleted": false,
    "is_unsorted": false,
    "custom_fields_values": [{
        "field_id": 93645,
        "field_name": "Телефон",
        "field_code": "PHONE",
        "field_type": "multitext",
        "values": [{"value": "3243243234", "enum_id": 45963, "enum_code": "WORK"}]
    }],
    "account_id": 31767314,
    "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/contacts/384936?page=1&limit=250"}},
    "_embedded": {
        "tags": [],
        "companies": [{
            "id": 384934,
            "_links": {"self": {"href": "https://araikrasoian.amocrm.ru/api/v4/companies/384934?page=1&limit=250"}}
        }]
    }
}
