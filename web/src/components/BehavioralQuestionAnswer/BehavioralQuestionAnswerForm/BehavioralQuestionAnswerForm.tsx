import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'



const BehavioralQuestionAnswerForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.behavioralQuestionAnswer?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="answer"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Answer
        </Label>
        
          <TextField
            name="answer"
            defaultValue={props.behavioralQuestionAnswer?.answer}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="answer" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.behavioralQuestionAnswer?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="public"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Public
        </Label>
        
          <CheckboxField
            name="public"
            defaultChecked={props.behavioralQuestionAnswer?.public}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="public" className="rw-field-error" />

        <Label
          name="showUserName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Show user name
        </Label>
        
          <CheckboxField
            name="showUserName"
            defaultChecked={props.behavioralQuestionAnswer?.showUserName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="showUserName" className="rw-field-error" />

        <Label
          name="behavioralQuestionId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Behavioral question id
        </Label>
        
          <NumberField
            name="behavioralQuestionId"
            defaultValue={props.behavioralQuestionAnswer?.behavioralQuestionId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="behavioralQuestionId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BehavioralQuestionAnswerForm
