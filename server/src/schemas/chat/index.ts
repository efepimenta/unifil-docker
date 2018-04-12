import {db} from '../../configs/mongo';
import * as mongoose from 'mongoose';

export interface ISip extends mongoose.Document {
    company: mongoose.Schema.Types.ObjectId,
    name: string,
    email: string,
    type: string,
    phone: string,
    active: boolean,
    deleted: boolean,
    version: number,    //versao atual, informa quantas vezes o registro foi alterado
    createdAt: Date,
    updatedAt: Date,
}

export interface ISipModel extends mongoose.Model<ISip> {
    findAllByAuthor(id: string): Promise<ISip>
}

export const user_schema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        default: 'S' //S=suporte - M=master, G=gerente
    },
    phone_code: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    roles: {
        type: Array,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    version: Number,    //versao atual, informa quantas vezes o registro foi alterado
    createdAt: {
        type: Date,
        'default': Date.now
    },
    updatedAt: {
        type: Date,
        'default': Date.now
    },
});

user_schema.static('findAllByAuthor', () => {

});

export const Sip = db.model<ISip>('Sip', user_schema);