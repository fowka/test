<?php

namespace App\Repository;

use App\Entity\Data;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Data>
 *
 * @method Data|null find($id, $lockMode = null, $lockVersion = null)
 * @method Data|null findOneBy(array $criteria, array $orderBy = null)
 * @method Data[]    findAll()
 * @method Data[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Data::class);
    }

    /**
     * @param string $name
     * @return Data[]
     */
    public function findByName(string $name) {
        return $this
            ->createQueryBuilder('d')
            ->andWhere('d.MAKTX LIKE :name')
            ->setParameter('name', '%' . $name . '%')
            ->getQuery()
            ->getResult();
    }

    /**
     * @param array $parameters
     * @param int $limit
     * @param int $offset
     * @return Data[]
     */
    public function findByParameters(array $parameters, int $limit = 0, int $offset = 0) {
        $qb = $this->createQueryBuilder('d');
        $queryParameters = [];
        foreach ($parameters as $key => $rows) {
            $expressions = [];
            foreach ($rows as $index => $row) {
                $valueFrom = $row['from'];
                if ($valueFrom) {
                    $field = 'd.' . $key;
                    $parameterFrom = ':' . $key . '_' . $index . '_from';
                    $valueTo = $row['to'];
                    if ($valueTo) {
                        $parameterTo = ':' . $key . '_' . $index . '_to';
                        $expressions[] = $qb->expr()->between($field, $parameterFrom, $parameterTo);
                        $queryParameters[$parameterFrom] = $valueFrom;
                        $queryParameters[$parameterTo] = $valueTo;
                    } else {
                        $expressions[] = $qb->expr()->eq($field, $parameterFrom);
                        $queryParameters[$parameterFrom] = $valueFrom;
                    }
                }
            }
            if ($expressions) {
                $qb->andWhere($qb->expr()->orX($expressions));
            }
        }
        foreach ($queryParameters as $parameterName => $parameterValue) {
            $qb->setParameter($parameterName, $parameterValue);
        }
        if ($limit) {
            $qb->setMaxResults($limit);
        }
        if ($offset) {
            $qb->setFirstResult($offset);
        }
        return $qb
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Data[] Returns an array of Data objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Data
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
