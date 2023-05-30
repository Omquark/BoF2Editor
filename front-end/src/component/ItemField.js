export function ItemField(props) {
    return (
        <div className='d-flex'>
            <span className='col-6'>
                <label className='pt-1' htmlFor='cost'>{props.label}</label>
            </span>
            <span className='col-6'>
                <input className='form-control form-control-sm'
                    type='number'
                    id='cost'
                    required
                    min={0}
                    max={65535}
                    defaultValue={props.value}
                    style={{ fontSize: '12px' }} />
            </span>
        </div>
    )
}