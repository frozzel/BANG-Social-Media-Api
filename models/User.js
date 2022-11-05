const { Schema, model}= require('mongoose');
const { Thought } = require('.');

const UserSchema= new Schema({
    username: {type: String, required: true, unique: true, trim: true,},
    email: {type: String, required: true, unique: true,
            match: [/^([A-Z0-9._%+-]+)@([A-Z0-9.-]+)\.([A-Z]{2,6})$/,'Please Enter A Valid Email!'],},
    thought: [{type: Schema.Types.ObjectId, ref: 'Thought',},],
    friends: [{type: Schema.Types.ObjectId, ref: 'User',},],},
    {
        toJSON: {virtuals: true, getters: true},
        id: false,
    });

UserSchema.virtual('friendCount').get(function(){ return this.friends.length;})

    const User= model('User', UserSchema);
    
    module.exports= User;