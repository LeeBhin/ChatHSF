function MyChat(vm, Chat) {
    const newChat = {
        type: 'MyChat',
        message: Chat
    };
    vm.chats.push(newChat)
}

async function BotChat(vm, Chat) {
    const newChat = {
        type: 'BotChat',
        index: vm.chats.length
    };
    vm.chats.push(newChat);
    WriteChat(vm, newChat.index, Chat);
}

function WriteChat(vm, index, Chat) {
    vm.isChat = true;

    const BlnClass = `B${index}`;
    const elements = document.getElementsByClassName(BlnClass);

    let charIndex = 0;
    const intervalId = setInterval(() => {
        if (charIndex < Chat.length) {
            for (let i = 0; i < elements.length; i++) {
                if (Chat.charAt(charIndex) === '\n') {
                    elements[i].innerHTML += '<br>';
                } else if (Chat.charAt(charIndex) === '㈜') {
                    charIndex++;
                    let website = '';

                    while (charIndex < Chat.length && Chat.charAt(charIndex) !== '㈜') {
                        website += Chat.charAt(charIndex);
                        charIndex++;
                    }
                    elements[i].innerHTML += `<a href="${website}" target='_blank'>이곳</a>`;
                } else if (Chat.charAt(charIndex) === '*') {
                    charIndex++;
                    let boldText = '';

                    while (charIndex < Chat.length && Chat.charAt(charIndex) !== '^') {
                        boldText += Chat.charAt(charIndex);
                        charIndex++;
                    }
                    elements[i].innerHTML += `<strong style="color: #0066ff;">${boldText}</strong>`;
                } else {
                    elements[i].innerHTML += Chat.charAt(charIndex);
                }
            }
            charIndex++;
        } else {
            clearInterval(intervalId);
            scrollBottom(vm);
            vm.isChat = false;
        }
    }, 3);
}

function scrollBottom(vm) {    //스크롤 다운
    const chatPage = vm.$refs.ScrollPage;
    chatPage.scrollTo({
        top: chatPage.scrollHeight,
        behavior: 'smooth'
    });
}

import { Decision } from "./Question_Decision";

function EnterEvent(vm, inputValue) {
    MyChat(vm, inputValue);   //내 채팅
    document.querySelector('#SearchBar > input').value = ''
    Decision(vm, inputValue)
}

export { MyChat, BotChat, WriteChat, scrollBottom, EnterEvent }