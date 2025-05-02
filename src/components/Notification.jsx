const Notification = ({messageText}) => {
    const message = messageText.message;
    const styleClass = messageText.styleClassName;
    if (message === null || message === '') {
        return null;
    }

    return (
        <div className={styleClass}>
            {message}
        </div>
    );
}

export default Notification;