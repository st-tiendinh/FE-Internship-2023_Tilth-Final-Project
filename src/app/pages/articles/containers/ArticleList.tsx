import { Sidebar } from '../../../shared/components';
import PublicPost, {
  PostListType,
} from '../../home/containers/components/PublicPost';

const ArticleList = () => {
  return (
    <section className="section section-wrapper">
      <div className="container">
        <div className="row">
          <div className="col col-8">
            <PublicPost type={PostListType.GRID} />
          </div>
          <div className="col col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleList;
