// modal window with title, body and action sections ??? should it contain close button?
import styled from 'styled-components';

const StyledModalWindow = styled.div`
  justify-self: center;
  align-self: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledModalCard = styled.section`
  display: grid;
  grid-template-areas: 'title close' 'body body' 'action action';
  grid-template-rows: 64px 1fr 64px;
  grid-auto-columns: auto min-content;
  margin: 0;
  padding: var(--normal);
`

const StyledModalTitle = styled.h4`
  grid-area: title;
  font-size: var(--fs-h4);
  color: var(--c-accent);
  margin: 0;
`

const StyledModalClose = styled.button.attrs(props => ({
  size: props.size && `--${props.size}` || '--normal'
}))`
  --size: var(${props => props.size});

  grid-area: close;
  display: flex;
  background: transparent;
  box-shadow: none;
  color: var(--c-white);
  font-family: inherit;
  line-height: var(--size);
  font-size: var(--size);
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: var(--xs);
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  & > svg {
    width: var(--size);
    height: var(--size);
  }

  &:hover > svg   {
    filter: var(--s-glow);
    color: var(--c-accent);
  }
`

export const StyledButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: inherit;
  font-size: var(--fs-text);
  font-weight: var(--fw-normal);
  line-height: 1;
  background: var(--c-blue-03);
  box-shadow: var(--s-button);
  color: var(--c-white);
  border: none;
  border-radius: var(--xs);
  margin: 0;
  padding: var(--s) var(--xl);
  min-width: 130px;
  cursor: pointer;
  transition: box-shadow 250ms ease-in-out;

  & > :first-child {
    margin-right: var(--xxs);
  }

  &:hover {
    box-shadow: var(--s-button-hover);
    color: var(--c-accent);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-blue-outline);
  }
`

const StyledModalBody = styled.div`
  grid-area: body;
  font-size: var(--normal);
  color: var(--c-white);
  margin: 0;
`


const StyledModalActions = styled.div`
  grid-area: action;
  margin: 0;
  padding: var(--xs) var(--normal);
`

const ModalClose = (props) => {
  return (
    <StyledModalClose>
      X
    </StyledModalClose>
  )
}

export const Modal = ({ children, title }) => {
  const handleReset = () => {
    reset
    router.back()
  }

  return (

    <StyledModalWindow>
      <StyledModalCard>
        <StyledModalTitle>
          { title }
        </StyledModalTitle>
        <ModalClose />
        <StyledModalBody>
          { children }
        </StyledModalBody>
        <StyledModalActions>
          <StyledButton type='button' onClick={handleReset}>Anuluj</StyledButton>
          <StyledButton type='submit'>OK</StyledButton>
        </StyledModalActions>
      </StyledModalCard>
    </StyledModalWindow>

  )
}