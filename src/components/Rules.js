import React, { Component } from "react";
import '../styles/Rules.css';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


class Rules extends Component{
  render(){
    return (
      <Accordion>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                      General Rules
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                  <p>
                    general rules stuff
                  </p>
              </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                      Deadpool Rules
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                  <p>
                    Select as many characters as you wish that you think will DIE in the next episode. For every correct prediction you are awarded 5 points. Beware, for every wrong pick you will be deducted 3 points.

                  </p>
              </AccordionItemPanel>
          </AccordionItem>
      <AccordionItem>
          <AccordionItemHeading>
              <AccordionItemButton>
                  Iron Throne Rules
              </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
              <p>
                Select as many characters as you wish that you think will DIE in the next episode. For every correct prediction you are awarded 5 points. Beware, for every wrong pick you will be deducted 3 points.

              </p>
          </AccordionItemPanel>
      </AccordionItem>
  <AccordionItem>
      <AccordionItemHeading>
          <AccordionItemButton>
              Azor Ahai Rules
          </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
          <p>
            Select as many characters as you wish that you think will DIE in the next episode. For every correct prediction you are awarded 5 points. Beware, for every wrong pick you will be deducted 3 points.

          </p>
      </AccordionItemPanel>
  </AccordionItem>
  <AccordionItem>
      <AccordionItemHeading>
          <AccordionItemButton>
              Special Chips Rules
          </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
          <p>
            Special chips stuff

          </p>
      </AccordionItemPanel>
  </AccordionItem>
</Accordion>


    );
  }
}

export default Rules;
