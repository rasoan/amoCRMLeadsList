//
import {ContactCustomFieldsValuesEnumType, ContactCustomFieldsValuesTypes} from "@/api/constants";

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
