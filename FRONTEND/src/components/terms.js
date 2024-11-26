import React from 'react';
import Navbar from './NavBar';
import Footer from './footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 flex-grow flex flex-col sm:flex-col ">
        <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions for Loan Application</h1>
        
        <h2 className="text-2xl font-semibold mb-4">TERMS AND CONDITIONS</h2>
        
        <ol className="list-decimal space-y-4">
          <li>
            A loan beneficiary shall, within two (2) years upon successful completion of the course for which the loan was granted, or upon earlier termination of such course for any reason or cause whatsoever, start the repayment of his/her student loan to the Board.
          </li>
          <li>
            The loan shall be repaid over a maximum period of five (5) years commencing two (2) years after completion of studies, beyond which the Board will have the right to take legal action.
          </li>
          <li>
            The loans shall be applied for each and every year.
          </li>
          <li>
            The loan shall be repaid with a value maintaining fee of 15% compound interest at maturity, which is two (2) years after successful/unsuccessful completion, for a maximum period of five (5) years.
          </li>
          <li>
            The board shall have the sole discretion of changing and varying the interest rate as circumstances shall demand.
          </li>
          <li>
            The Board retains the right to evaluate all loan applications and determine the number of beneficiaries. (This application is not a guarantee that the loan shall be approved.) In the event that the Loan Applicant discontinues studies for whatever reason before full disbursement is made, the Board shall not disburse the remaining allocation and shall recall the loan so far advanced in full together with the interest thereon.
          </li>
          <li>
            At a minimum, the loan shall be repayable in equal monthly installments as determined by the Board. Once-off payments are also accepted.
          </li>
          <li>
            If a Loan Applicant defaults in repayment when the loan is due, the whole amount shall become due and payable, and the Loan Applicant shall be bound to pay all other charges that may arise as a default, including but not limited to legal fees and penalties.
          </li>
          <li>
            The signature of the applicant shall certify the reading, understanding, and agreement with the terms and conditions herein.
          </li>
          <li>
            No loan shall be disbursed unless the loan application form is approved and upon the Loan Applicant completing the bonding form and the letter of undertaking, which shall be required to be submitted to the Secretariat.
          </li>
          <li>
            Loans are not transferable across Universities, between programs, and across loan cycles. A loan will be granted for the loan cycle in which it was applied for, the program applied for, and at the university under which the application was made.
          </li>
        </ol>
        
      </div>
      <Footer/>
    </div>
  );
};

export default Terms;
