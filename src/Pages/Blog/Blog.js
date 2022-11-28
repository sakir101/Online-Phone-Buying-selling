import React from 'react';

const Blog = () => {
    return (
        <div className='my-5'>
            <div>
                <h3 className='text-2xl font-bold'>1. What are the different ways to manage a state in a React application?</h3>
                <p>The Four Kinds of React State to Manage
                    <br />
                    Local (UI) state - Local state is data we manage in one or another component.
                    <br />
                    Global (UI) state - Global state is data we manage across multiple components.
                    <br />
                    Server state - Data that comes from an external server that must be integrated with our UI state.
                    <br />
                    URL state - Data that exists on our URLs, including the pathname and query parameters.
                </p>
            </div>
            <br />
            <div>
                <h3 className='text-2xl font-bold'>
                    2. How does prototypical inheritance work?
                </h3>
                <p>
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                </p>
            </div>
            <br />
            <div>
                <h3 className='text-2xl font-bold'>
                    3. What is a unit test? Why should we write unit tests?
                </h3>
                <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
            </div>
            <br />
            <div>
                <h3 className='text-2xl font-bold'>
                4. React vs. Angular vs. Vue?
                </h3>
                <p>
                    <strong>React</strong>
                    <br />
                    React doesn't enforce a specific project structure, and as you can see from the official “Hello World” example below, you can start using React with just a few lines of code.
                    React can be used as a UI library to render elements, without enforcing a specific project structure, and that's why it's not strictly a framework.
                    <br />
                    <strong>Vue </strong>
                    <br />
                    The Vue.js core library focuses on the View layer only. It's called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.
                    Although Vue is not strictly associated with the MVVM (Model-View-ViewModel) pattern, its design was partly inspired by it. With Vue, you'll be working mostly on the ViewModel layer, to make sure that the application data is processed in a way that allows the framework to render an up-to-date View.
                    <br />
                    <strong>Angular</strong>
                    <br />
                    In this article, I’m discussing Angular 2, and not the first version of the framework which is now known as AngularJS.

                    AngularJS, the original framework, is an MVC (Model-View-Controller) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.
                </p>
            </div>

        </div>
    );
};

export default Blog;