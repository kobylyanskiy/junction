import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score


plt.style.use('ggplot')


class Silh:

    @staticmethod
    def get_score(low_range, high_range):
        score = pd.DataFrame(columns =['Clusters_n', 'Score'])
        range_n_clusters = list(range(low_range, high_range))

        for n_clusters in range_n_clusters:
            clusterer = KMeans(n_clusters=n_clusters, random_state=10)
            cluster_labels = clusterer.fit_predict(X)
            silhouette_avg = silhouette_score(X, cluster_labels)
            score.loc[n_clusters] = [n_clusters, silhouette_avg]
            sample_silhouette_values = silhouette_samples(X, cluster_labels)
            y_lower = 10
            for i in range(n_clusters):
                ith_cluster_silhouette_values = sample_silhouette_values[cluster_labels == i]
                ith_cluster_silhouette_values.sort()

                size_cluster_i = ith_cluster_silhouette_values.shape[0]
                y_upper = y_lower + size_cluster_i

                y_lower = y_upper + 10
        score = score.reset_index()
        return score
