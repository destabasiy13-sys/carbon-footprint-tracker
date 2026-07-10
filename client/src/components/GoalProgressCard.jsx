const CATEGORY_LABELS = {
  transport: 'Transport',
  energy: 'Home Energy',
  food: 'Food',
};

export default function GoalProgressCard({ goal, onDelete }) {
  const { progress } = goal;
  const hasBaseline = progress.percentReduced !== null;
  const clampedPercent = hasBaseline ? Math.max(0, Math.min(100, progress.percentReduced)) : 0;

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h3 className="h6 mb-1">
            {CATEGORY_LABELS[goal.category] || goal.category} — reduce by{' '}
            {Number(goal.target_reduction_percent)}%
          </h3>
          <small className="text-muted">
            {goal.start_date} to {goal.end_date}
          </small>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(goal.id)}>
          Delete
        </button>
      </div>

      {!hasBaseline ? (
        <p className="text-muted mb-0 small">
          Not enough activity logged before the start date to establish a baseline yet.
        </p>
      ) : (
        <>
          <div className="progress" style={{ height: 20 }}>
            <div
              className={`progress-bar ${progress.onTrack ? 'bg-success' : 'bg-warning'}`}
              style={{ width: `${clampedPercent}%` }}
            >
              {progress.percentReduced.toFixed(0)}%
            </div>
          </div>
          <small className="text-muted">
            {progress.baselineTotal.toFixed(1)} kg baseline → {progress.actualTotal.toFixed(1)} kg
            so far ({progress.onTrack ? 'on track' : 'behind target'})
          </small>
        </>
      )}
    </div>
  );
}
