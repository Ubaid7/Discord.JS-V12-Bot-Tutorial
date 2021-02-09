module.exports ={
    commands: ['del', 'purge'], // You Can Keep Any Name
    permissions: 'ADMINISTRATOR', // You Can Keep Any Permission
    permissionError: 'You Cant Use It', 
    description: 'Deletes Message', //Optional
    callback: (message, args) => {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send('Please Enter A Number.')
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('You Can Only Delete Messages From 1 To 99.')
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There Was An Error Deleting Messages In This Cahnnel.')
        })
    }
}