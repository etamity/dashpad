module.exports = params => {
  let count = 0;
  const { username } = params;
  console.log(username);
  setInterval(() => {
    if (count < 100) {
      count = count + 1;
    } else {
      Dashpad.exit();
    }
    let date = new Date();
    // const action = {
    //     type: 'SHOW_TOAST',
    //     payload: {   message: 'hahahaha' },
    // };
    // process.send(action);
    // Dashpad.showToast({
    //     message: 'hahahaha'
    // });
    Dashpad.setVars([
      {
        keyPath: 'header',
        value: username + ':' + date.getSeconds()
      },
      {
        keyPath: 'progress',
        value: count
      }
    ]);
    Dashpad.settings.set('test', count);

  }, 200);
};
