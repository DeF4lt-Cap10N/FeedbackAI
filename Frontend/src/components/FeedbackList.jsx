import FeedbackItem from './FeedbackItem';

const FeedbackList = ({ feedbacks }) => {
  return (
    <ul className="mt-4 space-y-2">
      {feedbacks.map((fb) => (
        <FeedbackItem key={fb.id} feedback={fb} />
      ))}
    </ul>
  );
};

export default FeedbackList;
