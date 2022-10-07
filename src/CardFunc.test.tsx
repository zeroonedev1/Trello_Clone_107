import { CardFunc } from './CardFunc';
import * as ReactDOM from 'react-dom';
import { Column } from './Column';


describe('Card Functional Component', () => {

    let container: HTMLDivElement
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<CardFunc text={''} index={0} id={''} columnId={''} desc={''} taskId={''} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it('CardFunc Render Complete', () =>{
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(2);
    })
})