//

/** То, что возвращает наш сервер */
export namespace ApiResponses {
    export type GetLeadsDataReturn = Lead[];

    export interface Lead {
        "id": number,
        "name": string,
        "price": number,
        "responsible_user_id": number,
        "group_id": number,
        "status_id": number,
        "created_at": number,
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
            leads: Lead[]
        }
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
        "_embedded": object
    }
}
