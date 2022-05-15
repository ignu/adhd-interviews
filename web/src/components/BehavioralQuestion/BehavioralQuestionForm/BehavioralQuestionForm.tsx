import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'



const BehavioralQuestionForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.behavioralQuestion?.id)
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
          name="question"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Question
        </Label>
        
          <TextField
            name="question"
            defaultValue={props.behavioralQuestion?.question}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="question" className="rw-field-error" />

        <Label
          name="category"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>
        
          
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-0"
            name="category"
            defaultValue="ACTION_ORIENTED"
            defaultChecked={props.behavioralQuestion?.category?.includes('ACTION_ORIENTED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Action Oriented
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-1"
            name="category"
            defaultValue="ADAPTIVE"
            defaultChecked={props.behavioralQuestion?.category?.includes('ADAPTIVE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Adaptive
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-2"
            name="category"
            defaultValue="COMMUNICATION"
            defaultChecked={props.behavioralQuestion?.category?.includes('COMMUNICATION')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Communication
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-3"
            name="category"
            defaultValue="CONFLICT"
            defaultChecked={props.behavioralQuestion?.category?.includes('CONFLICT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Conflict
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-4"
            name="category"
            defaultValue="CREATIVITY"
            defaultChecked={props.behavioralQuestion?.category?.includes('CREATIVITY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Creativity
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-5"
            name="category"
            defaultValue="DECISION_MAKING"
            defaultChecked={props.behavioralQuestion?.category?.includes('DECISION_MAKING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Decision Making
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-6"
            name="category"
            defaultValue="HANDLING_PRESSURE"
            defaultChecked={props.behavioralQuestion?.category?.includes('HANDLING_PRESSURE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Handling Pressure
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-7"
            name="category"
            defaultValue="PROBLEM_SOLVING"
            defaultChecked={props.behavioralQuestion?.category?.includes('PROBLEM_SOLVING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Problem Solving
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="behavioralQuestion-category-8"
            name="category"
            defaultValue="TEAMWORK"
            defaultChecked={props.behavioralQuestion?.category?.includes('TEAMWORK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Teamwork
          </div>
        </div>
          
        

        <FieldError name="category" className="rw-field-error" />

        <Label
          name="common"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Common
        </Label>
        
          <CheckboxField
            name="common"
            defaultChecked={props.behavioralQuestion?.common}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="common" className="rw-field-error" />

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

export default BehavioralQuestionForm
