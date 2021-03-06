/**
 * Scrapbook
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EditorObjectTypeEnum } from './editorObjectTypeEnum';
import { EditorInteractionTypeEnum } from './editorInteractionTypeEnum';


export interface EditorInteractionComment { 
    interactionId?: string;
    message?: string | null;
    parentId?: string | null;
    objectTypeEnum?: EditorObjectTypeEnum;
    objectId?: string;
    interactionTypeEnum?: EditorInteractionTypeEnum;
    userId?: string;
    id?: string;
}

