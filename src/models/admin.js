
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const APIError = require('../../api/utils/APIError');
import { transformData, listData } from '../../api/utils/ModelUtils';
co

/**
 * User Roles
 */
const roles = ['Directeur_Stage', 'Administratif'];
const droit =['GERER_ETUDIANT','GERER_EVENNEMENT','GERER_ENSEIGNATS']

const Administratif = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128
    },

    nom: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true
    },
    prenom: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true
    },
    num_tel: {
      type: String,
      maxlength: 8,
      trim: true
    },
  role:{
    type: String,
    enum: roles,
    default: 'user'
  },
access:[{
droit:{
    type: String,
    enum: droit
  
}
}]
  },
  {
    timestamps: true
  }
);
const ALLOWED_FIELDS = ['id', 'nom', 'email', 'prenom', 'num_tel','droit', 'date_de_naissance', 'createdAt'];

Administratif.pre('save', async function save(next) {
  try {
    // modifying password => encrypt it:
    const rounds = 10;
    if (this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, rounds);
      this.password = hash;
    }
    return next(); // normal save
  } catch (error) {
    return next(error);
  }
});
Administratif.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform( { query }) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },

 

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});
Administratif.statics = {
   
  
    /**
     * Get user
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
      try {
        let user;
  
        if (mongoose.Types.ObjectId.isValid(id)) {
          user = await this.findById(id).exec();
        }
        if (user) {
          return user;
        }
  
        throw new Error({
          message: 'User does not exist',
          status: httpStatus.NOT_FOUND
        });
      } catch (error) {
        throw error;
      }
    }
}
const Administration = mongoose.model('Administration', Administratif);
Administration.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Administration;