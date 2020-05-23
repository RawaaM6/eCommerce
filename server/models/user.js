import { v1 as uuidv1 } from "uuid";
uuidv1();
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 5,
            maxlength: 220,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },

        history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encrypyPassword(password);
}).get();

userSchema.methods = {
    encrypyPassword: function (password) {
        if (!password) return;
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        }
        catch (err) { return '' }
    },
};
