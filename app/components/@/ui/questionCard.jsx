const QuestionCard = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="font-light">{description}</p>
    </div>
  );
};

export default QuestionCard;
