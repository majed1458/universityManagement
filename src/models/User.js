
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


/**
 * User Roles
 */
const roles = ['Etudiant', 'Directeur_Stage', 'enseignant', 'Administratif'];
const droit =['GERER_ETUDIANT','GERER_EVENNEMENT','GERER_ENSEIGNATS']


const UserSchema = new mongoose.Schema(
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
    image: {
      type: String,

    },
    date_de_naissance: {
      type: String
    },
    niveau: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true
    },
    classe: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true
    },
    alumni: {
      type: Boolean,
      
    },

    cv: {
      type: String,

    },
    num_tel: {
      type: String,
      maxlength: 8,
      trim: true
    },
    diplomé: {
      type: Boolean,
      
    },
    public:{
      type: Boolean,
    },
    role:{
      type: String,
      enum: roles,
      default: 'Etudiant'
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

UserSchema.pre('save', async function save(next) {
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
UserSchema.method({
 
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = {User};