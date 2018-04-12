import {db} from '../../configs/mongo';
import {Document, Schema} from 'mongoose';

export interface IChat extends Document {
    from: { id: Number, name: String },
    content: string,
    action: string,
    createdAt: Date,
    updatedAt: Date,
}

const superuser_schema = new Schema({
    from: {id: Number, name: String},
    content: String,
    action: String,
    createdAt: {
        type: Date,
        'default': Date.now
    },
    updatedAt: {
        type: Date,
        'default': Date.now
    },
});


export const Chat = db.model<IChat>('Chat', superuser_schema);