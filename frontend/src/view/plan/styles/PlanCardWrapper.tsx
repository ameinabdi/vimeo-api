import styled from 'styled-components';

const PlanCardWrapper = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 24px;
    flex-grow: 0;
  }

  .pricing {
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 16px;
    flex-grow: 0;
  }

  .pricingPeriod {
    font-size: 16px;
    font-weight: normal;
  }

  .description {
    flex-grow: 1;
    margin-bottom: 16px;
    text-align: center;
  }

  .notPlanUser {
    text-align: left;
    font-size: 13px;
  }

  .cancelAtPeriodEnd {
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: left;
    font-size: 13px;
    margin-left: -17px;
    margin-right: -17px;
    background-color: #de3618;
    color: white;
    padding-left: 16px;
    border-bottom: 1px solid rgb(224, 224, 224);
    border-top: 1px solid rgb(224, 224, 224);
  }

  .somethingWrong {
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: left;
    font-size: 13px;
    margin-left: -17px;
    margin-right: -17px;
    background-color: #ed8936;
    color: white;
    padding-left: 16px;
    border-bottom: 1px solid rgb(224, 224, 224);
    border-top: 1px solid rgb(224, 224, 224);
  }
`;

export default PlanCardWrapper;
