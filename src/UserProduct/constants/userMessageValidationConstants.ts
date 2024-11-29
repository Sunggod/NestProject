export const messagesValidation = {
    name: {
      messageString: "O campo name deve ser uma string!",
      messageEmpty: "O campo name não pode estar vazio!",
      messageLength: "O campo name deve ter entre 3 a 12 caracteres",
    },
    email: {
      messageString: "O campo email deve ser uma string!",
      messageEmpty: "O campo email não pode estar vazio!",
      messageLength: "O campo email deve ter entre 10 a 60 caracteres",
    },
    password: {
      messageString: "O campo password deve ser uma string!",
      messageEmpty: "O campo password não pode estar vazio!",
      messageLength: "O campo password deve ter entre 3 a 12 caracteres",
      messageHashBcrypt:"O campo password deve ser um hash bcrypt válido!"

    },
    products:{
        messageArray: "O campo products deve ser uma array!"
    },
    cart:{
        messageArray: "O campo cart deve ser uma array!"
    }
  };
  