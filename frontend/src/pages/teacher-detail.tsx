
import { TeacherDetail } from '@/components/teacher-detail';
import { useParams } from 'react-router-dom';

const TeacherDetailPage = () => {
  const { teacherId } = useParams() as { teacherId: string };

  return (
     <div className="min-h-screen bg-background">
      <TeacherDetail teacherId={teacherId} />
    </div>
  );
};

export default TeacherDetailPage;