const Sequelize =  require('sequelize')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email:{
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
            },
            nick:{
                type: Sequelize.STRING(20),
                allowNull: false
            },
            password:{
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
}