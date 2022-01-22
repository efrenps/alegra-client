import React from 'react';
import { toast } from 'react-toastify';

class ModalUtils {
    static errorMessage(messages = [], message = null) {
        const content = this.getMessageContent(messages, message);
        toast.error(content);
    }

    static warningMessage(messages = [], message = null) {
        const content = this.getMessageContent(messages, message);
        toast.warning(content);
    }

    static infoMessage(messages = [], message = null) {
        const content = this.getMessageContent(messages, message);
        toast.info(content);
    }

    static successMessage(messages = [], message = null) {
        const content = this.getMessageContent(messages, message);
        toast.success(content);
    }

    static getMessageContent(messages, message) {
        let content;

        if (Array.isArray(messages) && messages.length > 0) {
            content = messages.map((item, index) => (
                <p key={index}>{`${item.Message || item.message}`}</p>
            ));
        } else if (message !== null) {
            content = <p>{ `${message}` }</p>;
        } else {
            content = <p>Something went wrong</p>;
        }

        const Message = () => (
            <div>
                {content}
            </div>
        );

        return Message;
    }
}

export default ModalUtils;
