class Id {
  constructor(data, configurations, librairies) {
    this.joi = librairies;




  }

  validate() {

  }

  create() {

  }
}



export default joi
  .object({
    id: joi
      .string()
      .hex()
      .length(24)
      .description('A MongoDB _id in string format')
  })
  .options({
    presence: 'required',
    stripUnknown: true,
    abortEarly: true 
  });


