// 請問下列程式碼印出的順序為何？

function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);

  /**
   * 4 1 3 5 2
   * 
   * line 12 先做 --> 
   * line 13 呼叫函式，執行setTimeout，由於異步特性所以裡面的東西給底層therad做，並不會等待裡面的function做完，因此接續 line 9，syncF()結束 -> 
   * line 14 console.log
   *  */ 
