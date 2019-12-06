var url = "ws://10.31.162.41:5000";

let ws = new WebSocket(url);
let move = 0;
let username = cookie.get('username');
let photo = cookie.get('photo');
let data = {
    "username": username,
    "msg": "进入了ZERO的聊天室",
    "photo": photo
};
ws.onopen = function() {
    ws.send(JSON.stringify(data));
}
ws.onmessage = function(msg) {
    let len = msg.data.split(';').length;
    move += 400;
    console.log(msg.data);
    if (len == 4) {
        let name = msg.data.split(';')[0];
        let content = msg.data.split(';')[1];
        let count = msg.data.split(';')[2];
        let photo = msg.data.split(';')[3];
        let date = new Date();
        date = date.toLocaleString().slice(11);
        if (name == username) {
            var str = `
            <li class="clearfix">
                            <div class="message-data align-right other-message-data">
                                <span class="message-data-time">${date}</span>
                                <span class="message-data-name">${name}</span>
                                <img src=${photo} alt="">
                            </div>
                            <div class="message other-message float-right">
                            ${content}
                            </div>
            </li>
            `
        } else {
            var str = `
            <li class="clearfix">
                <div class="message-data">
                    <img src=${photo} alt="">
                    <span class="message-data-name">${name}</span>
                    <span class="message-data-time">${date}</span>
                </div>
                <div class="message my-message">
                    ${content}
                </div>
            </li>
    `
        }
        if (content == "进入了ZERO的聊天室") {
            let str2 = `
            <li class="clearfix">
                <img src=${photo} alt="" />
                <div class="about">
                    <div class="name">${name}</div>
                    <div class="status">
                        <i class="online"></i> online
                    </div>
                </div>
            </li>
            `
            $('.list').append(str2);
        }

        $('.chat-list').append(str);
        $('.chat-num-messages>i').html(count);

    } else if (len == 2) {
        let name = msg.data.split(';')[0];
        let count = msg.data.split(';')[1];
        let str = `
        <p>提示：用户<em>${name}</em>离开了聊天室</p>
        `
        console.log($('.name'));
        let arr = Array.from($('.name'));
        for (let i = 0; i < arr.length; i++) {
            console.log($(arr[i]).html());
            if ($(arr[i]).html() == name) {
                // console.log($(arr[i]).parents().eq(1));
                $(arr[i]).parents().eq(1).remove();
            }
        }
        $('.chat-list').append(str);
        $('.chat-num-messages>i').html(count);
    }

    $('.chat-history').scrollTop(move);

}