import React, {useState} from 'react';

const InputForm = (props) => {
  const [message, setMessage] = useState("");

  const onMessageChange = (e) =>{
    setMessage(e.target.value);
  }

  const onSubmit = (e) => {
    // console.log(e);
    e.preventDefault();  // prevents the default of the event. in this case: button does not refresh page
    props.handleSubmit(e);
    setMessage(""); // reset textbox to empty string
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="message"></label>
          <textarea rows="5" cols="60" id="textBox" value={message} onChange={onMessageChange} placeholder="Write a new message here!"/>
        </div>
        <div>
          <button value={message} onClick={onSubmit}>Send</button>
        </div>
      </form>
    </div>
  )
}

export default InputForm;
