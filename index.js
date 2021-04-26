const venom = require("venom-bot");
const { Aki } = require("aki-api");
const region = "ar";
const aki = new Aki(region);
const gamearray = [];

venom 
  .create(" ")
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body) {
      if (
        message.body.toLowerCase().includes("cancel") &&
        message.isGroupMsg === false &&
        gamearray.includes(message.from)
      ) {
        gamearray.pop();

        return client.sendText(
          message.from,
          `انتهت اللعبة . لبدء لعبة اكتب "Play"`
        );
      }

      if (gamearray.includes(message.from)) {
        if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          console.log(message.from + ":", aki.answers[0]);
          gamearray.pop();
          return client.sendText(
            message.from,
            "انتهت اللعبة! \n أعتقد أن شخصيتك هي ... *"+ "*" +
            aki.answers[0].name +"*" +
            `*\n \n أتمنى أن أكون على صواب! للعب مرة أخرى اكتب "play"` + "\n \n Made By Ahmed."
            );
        }

        switch (message.body.toLowerCase()) {
          case "نعم":
            await aki.step(0);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );
            case "نعم":
              await aki.step(0);
              return client.sendText(
                message.from,
                aki.question + "\n\n" + aki.answers.join("\n")
              );
  
          case "لا":
            await aki.step(1);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "لا":
            await aki.step(1);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "انا لا اعلم":
              await aki.step(2);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "انا لا اعلم":
            await aki.step(2);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

            case "من الممكن":
            await aki.step(3);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

            case "من الممكن":
            await aki.step(3);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

            case "الظاهر لا":
            await aki.step(4);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

            case "الظاهر لا":
              await aki.step(4);
              return client.sendText(
                message.from,
                aki.question + "\n\n" + aki.answers.join("\n")
              );
          default:
            return;
        }
      }

      if (
        message.body.toLowerCase().includes("cancel") &&
        message.isGroupMsg === false &&
        !gamearray.includes(message.from)
      ) {
        return client.sendText(
          message.from,
          ` لا توجد لعبة مفتوحة. لبدء لعبة اكتب "Play"`
        );
      }

      if (
        message.body.toLowerCase().includes("help") &&
        message.isGroupMsg === false
      ) {
        return client.sendText(
          message.from,
          "*how to play :*\n\n" +
            "Welcome to Ahmed game guild , dont forget to follow me @9wmm" +
            `\n type play to start a game"`
        );
      }
      if (
        message.body.toLowerCase().includes("play") &&
        message.isGroupMsg === false
      ) {
        if (gamearray.includes(message.from)) {
          return client.sendText(
            message.from,
            `لديك بالفعل لعبة مفتوحة ، إذا كنت تريد إنهاء اللعبة ، أرسل "إلغاء""`
          );
        }

        await aki.start();
        gamearray.push(message.from);

        client.sendText(
          message.from,
          aki.question + "\n\n" + aki.answers.join("\n")
        );
      }
    } else {
      console.log(err);
    }
  });
}
