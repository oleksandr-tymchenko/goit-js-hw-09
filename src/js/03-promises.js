
import Notiflix from 'notiflix';  

const form = document.querySelector('.form')




form.addEventListener('submit', formElementValue);

function formElementValue(e) {
    e.preventDefault()
  let formElements = e.currentTarget.elements;
  let amount = Number(formElements.amount.value);
  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
    
  counterPromises(delay, step, amount);
}

function counterPromises(delay, step, amount) {

  for (let i = 1; i <= amount; i++){
    createPromise(i, delay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    . catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject ({position, delay});
      };
      
    }, delay);
    
  });
  
};


