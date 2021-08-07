async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);

  /**
   *  4 1 5 2 3 
   * 因為async function中，需要等待Promise結束而async function之外不受限制，會繼續被執行，等Promise結束後才會執行await以後的程式。
   */