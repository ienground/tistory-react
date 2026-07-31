import {
  LocalLog,
  LOCAL_INFO_DEPTH,
  LOCAL_INFO_LINK,
  LOCAL_INFO_TITLE,
  LOCAL_SPOT,
  LOCAL_SPOT_DEPTH,
} from '@ienlab/tistory-react/component/LocalLog';

export default function LocalPage() {
  return (
    <LocalLog>
      <div className="area_common">
        <section id="localog" className="box_tag_trail row nonEntry main">
          <h3 className="title_common">Local Log</h3>
          <LocalLog.SpotRep>
            <div className="spot" style={{ marginLeft: LOCAL_SPOT_DEPTH + 'px' }}>
              {LOCAL_SPOT}
            </div>
          </LocalLog.SpotRep>
          <LocalLog.InfoRep>
            <div className="info" style={{ marginLeft: LOCAL_INFO_DEPTH + 'px' }}>
              <a href={LOCAL_INFO_LINK}>{LOCAL_INFO_TITLE}</a>
            </div>
          </LocalLog.InfoRep>
        </section>
      </div>
    </LocalLog>
  );
}
