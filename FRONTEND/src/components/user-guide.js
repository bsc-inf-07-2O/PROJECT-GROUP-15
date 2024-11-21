import React from 'react';

const UserGuide = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      {/* Embedding the PDF directly */}
      <iframe
        src="/images/HESLGB_System_Student_Guide.pdf"
        title="HESLGB System Student Guide"
        width="100%"  // Full width of the viewport
        height="100%"  // Full height of the viewport
        className="border-0"  // Remove borders
        style={{ position: 'absolute', top: 0, left: 0 }}  // Ensure it covers the full screen
      />
    </div>
  );
};

export default UserGuide;
