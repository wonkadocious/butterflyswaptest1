 window.getReturnCode = function() {
  return getMyReturnCode();
 };  
 
 window.fbshare = function(msg1,msg2) {
  shareFB(msg1,msg2);
 };

window.purchaseUnlimitedLives = function() {
 unlimitedLivesPurchase();
}; 

window.invitefriends = function() {
  inviteFbFriends();
}

window.coins100k = function() {
  k100k();
}

window.saveGameData = function(msg1) {
  saveData(msg1);
}

function inviteFbFriends() {
  console.log('made it to inviteFbFriends')
  FB.ui({method: 'apprequests',
    message: 'Come and join me in the Butterfly Swap Explosion!'
  }, function(response){
  console.log(response);
  });

} // end inviteFbFriends()

function shareFB(msg1,msg2) {

  FB.ui({ method: 'feed',
    caption: "Butterfly Swap Explosion!",
    link: msg1,
    picture: msg2,
    description: "A new kind of Match 3 adventure with the Butterflies of Wonkadocious"
  }, function(){});

} // end shareFB()

function saveData(msg1) {
    console.log("inside saveData " + msg1);
    //Parse.User.logOut();
} // end saveData

var myRandom = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var getUniqueID = function() {
    return myRandom() + myRandom(); // to make it longer
};

var returnCode;
var purchaseID;

function k100k() {
  console.log('inside k100k');

   returnCode = -1;
  FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      app_id: '811953658913005',
      product: 'http://butterflyswaptest.parseapp.com/coins100K.html',
      quantity: 1,                 
      request_id: purchaseID
    },
    verifyPayment
  );
}

///////////////
function base64_decode(data) {
  //  discuss at: http://phpjs.org/functions/base64_decode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Onno Marsman
  // bugfixed by: Pellentesque Malesuada
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: base64_decode('YQ===');
  //   returns 2: 'a'

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec.replace(/\0+$/, '');
}
//////////////

function verifyPayment(data) {
 if(!data) {
   // alert("There was an undefined error processing your payment. Please try again!" );
    console.log(data);
    returnCode = 1;
    return;
  }
 if( data.error_code ) {
    //alert("There was an error processing your payment. Please try again! " + data.error_message);
    console.log(data);
    returnCode = 1;
    return;
  }

  if (data.status == 'failed') {
   // alert('Payment Failed ');
    returnCode = 1;
    return;
  }

  if (data.status == 'initiated') {
    //alert('Payment Initiated - UnlimitedLives will be granted when the payment completes.');
    returnCode = 2;
//    return;
  } else {
    returnCode = 0;
}
 //console.log('status: ' + data.status + ' return code: ' + returnCode);

  // IMPORTANT: You should pass the data object back to your server to validate
  // the contents, before fulfilling the order.
//  returnCode = 0;
 // var mydata = data.signed_request; 
 // var sreq = mydata.split('.')[1];
//  console.log("Payment verification complete, signed request:" + base64_decode(sreq) );
  //console.log(data);

  //alert("Payment Successful");
}

 function getMyReturnCode() {
   return returnCode;
}

