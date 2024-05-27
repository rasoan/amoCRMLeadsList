//

import {ContactCustomFieldsValuesEnumType, ContactCustomFieldsValuesTypes} from "../Api";

/** То, что возвращает наш сервер */
export namespace ApiResponses {
    export type GetLeadsDataReturn = Lead[];

    export interface Lead {
        id: number,
        /** Название сделки */
        name: string,
        /** Стоимость */
        price: number,
        /** Ответственный юзер */
        responsible_user: UserResponsibly,
        /** Идентификатор по которому получим список возможных статусов */
        pipeline_id: number,
        /** Статус сделки */
        status: Status,
        /** Дата создания сделки */
        created_at: number,
        contacts: Contact[],
    }

    export interface Status {
        name: string,
        backgroundColor: string,
    }

    export interface UserResponsibly {
        id: number,
        name: string,
        email: string,
    }

    export interface Contact {
        id: number,
        name: string,
        phoneNumbers: CustomFieldValueForContact<ContactCustomFieldsValuesTypes.Phone>[];
        emails: CustomFieldValueForContact<ContactCustomFieldsValuesTypes.Email>[];
    }

    export interface CustomFieldValueForContact {
        value: string,
        enumType: ContactCustomFieldsValuesEnumType,
        enum_id: number,
    }
}

/** То, что возвращает amoCRM */
export namespace AmoCRMResponses {
    export interface TokensResponseData {
        token_type: 'Bearer',
        expires_in: number,
        access_token: string,
        refresh_token: string
    }

    export interface GetLeadsData {
        "_page": number,
        "_links": object,
        "_embedded": {
            leads: Lead[],
        }
    }

    export interface ContactFromLead {
        id: number,
    }

    export type GetContactsListData = Contact[];

    export interface CustomFieldValueForContact {
        value: string,
        enum_code: ContactCustomFieldsValuesEnumType,
    }

    export interface Contact {
        id: number,
        name: string,
        responsible_user_id: number,
        custom_fields_values?: {
            field_code: T,
            values: CustomFieldValueForContact[]
        }[],
    }

    export interface Lead {
        "id": number,
        "name": string,
        "price": number,
        "responsible_user_id": number,
        "group_id": number,
        "status_id": number,
        "pipeline_id": number,
        "loss_reason_id": number | null,
        "created_by": number,
        "updated_by": number,
        "created_at": number,
        "updated_at": number,
        "closed_at": number,
        "closest_task_at": number,
        "is_deleted": boolean,
        "custom_fields_values": null,
        "score": null,
        "account_id": number,
        "labor_cost": null,
        "_links": object,
        "_embedded": {
            contacts: ContactFromLead[]
        },
    }

    export interface GetStatusesList {
        _total_items: number,
        _embedded: {
            statuses: Status[],
        }
    }

    export interface GetUser {
        id: number,
        name: string,
        email: string,
    }

    export interface Status {
        id: number,
        name: string,
        sort: number,
        is_editable: boolean,
        pipeline_id: number,
        color: string,
        type: number,
        account_id: number,
        _links: object,
    }
}


